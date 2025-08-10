import { CreateUserParams, GetMenuParams, SignInParams, User } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.junkfood",
  databaseId: "6892a04b003675be3c4c",
  bucketId: "6897f6a30018e995d6cc",
  userCollectionId: "6892a0890039911e006e",
  categoriesCollectionId: "6897f172001a3a264c85",
  menuCollectionId: "6897f2220036b01b771e",
  customizationsCollectionId: "6897f3e5000a3e9b0908",
  menuCustomizationsCollectionId: "6897f4d70037c74621f0",
};

export const client = new Client();

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createUser = async ({ name, email, password }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      name,
      avatar: avatarUrl,
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0] as unknown as User;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menus = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.menuCollectionId, queries);

    return menus.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.categoriesCollectionId);

    return categories.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};
