import { Profile } from '../../models/profile';
import { dbConnection, handleMongoError } from '../../utils/db_utils';

const PROFILE_COLLECTION = "profile";

export async function findProfile(email: string) {
    try {
        return await dbConnection.collection(PROFILE_COLLECTION)
            .findOne<Profile>({ email: email });
    } catch (error) {
        handleMongoError(error, "find profile");
    }
}

export async function addProfile(profile: Profile) {
    try {
        let res = await dbConnection.collection(PROFILE_COLLECTION)
            .insertOne(profile);
        return (res.insertedCount > 0);
    } catch (error) {
        handleMongoError(error, "add profile");
    }
}


