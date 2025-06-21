import type {Request, Response} from "express";
import type {ParamsDictionary} from "express-serve-static-core";
import { db } from './firebaseConfig';

type SafeRequest = Request<ParamsDictionary, object, Record<string, unknown>>;
type SafeResponse = Response;

export const signInRequest = (req: SafeRequest, res: SafeResponse) => {
    // Supress warnings
    console.log("Sign in request received at:", req.url);
    testDBchange();
    res.json({ status: "success", message: "Signed in" });
}

export const createAccRequest = (req: SafeRequest, res: SafeResponse) => {
    // Supress warnings
    console.log("Create Account request received at:", req.url);
    testDBAddMatrix();
    res.json({ status: "success", message: "Account created" });
}

export const getUserData =  async (req: SafeRequest, res: SafeResponse) => {
    const userID = req.query.id;
    console.log(userID);
    console.log(typeof userID);
    if (typeof userID === 'string') {
        const calenderData = db.collection("users").doc(userID);
        const doc = await calenderData.get();
        if (doc.exists) {
            res.status(200).json(doc);
        } else {
            res.status(200).json({});
        }
    } else {
        res.status(404).send({status: "User Not Found"});
    }
}

const testDBchange = async (): Promise<any> => {
    await db.collection('users').doc('test').set({
        data: 'Change it to Yang',
    });
};

const testDBAddMatrix = async (): Promise<any> => {
    await db.collection('users').doc('user_2ypnofjP8HiE3khsBWlsSfBfKuf').set({
        data: {
            "6/20" : ["a", "b"],
            "6/21" : ["c", "d"],
            "6/22" : ["e", "f"]
        }}, { merge: true }
    );
}