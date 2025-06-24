import type {Request, Response} from "express";
import type {ParamsDictionary} from "express-serve-static-core";
import { db } from './firebaseConfig';

type SafeRequest = Request<ParamsDictionary, object, Record<string, unknown>>;
type SafeResponse = Response;
type DataMap = { [date: string]: string[] } | undefined;

export const signInRequest = (req: SafeRequest, res: SafeResponse) => {
    // Supress warnings
    console.log("Sign in request received at:", req.url);
    res.json({ status: "success", message: "Signed in" });
}

export const createAccRequest = (req: SafeRequest, res: SafeResponse) => {
    // Supress warnings
    console.log("Create Account request received at:", req.url);
    res.json({ status: "success", message: "Account created" });
}

export const getUserData =  async (req: SafeRequest, res: SafeResponse) => {
    const userID = req.query.id as string;
    console.log(userID);
    if (typeof userID === 'string') {
        const calenderData = db.collection("users").doc(userID);
        const doc = await calenderData.get();
        if (doc.exists) {
            console.log("First Branch");
            console.log(doc.data());
            res.status(200).json(doc.data());
        } else {
            console.log("Second Branch");
            addUser(userID);
            res.status(200).json({});
        }
    } else {
        res.status(404).send({status: "User Not Found"});
    }
}

export const addUser = async (userID : string) : Promise<any> => {
    console.log("Add User");
    await db.collection("users").doc(userID).set({
        data:{}
    })
    console.log("User with ID " + userID + " added")
}

export const updateData = async (req: SafeRequest, res: SafeResponse) => {
    const userID = req.body.userID as string;
    const exercise = req.body.addExercise as string;
    const date = req.body.addDate as string;
    if (typeof userID === 'string') {
        const data = db.collection("users").doc(userID);
        const doc = await data.get();
        const userData = doc.data();
        if (userData) {
            if (!userData['data'][date]) {
                userData['data'][date] = []
                userData['data'][date].push(exercise)
            } else {
                userData['data'][date].push(exercise)
            }
            DBchange(userID, userData)
            res.json({ status: "success", message: "Data Updated" });
        }
    } else {
        res.status(404).send({status: "User Not Found"})
    }
}

export const modifyData = async (req: SafeRequest, res: SafeResponse) => {
    const userID = req.body.userID as string;
    const date = req.body.modifyDate as string;
    const exerciseOld = req.body.exerciseToModify as string;
    const exerciseNew = req.body.newExercise as string;
    if (typeof userID === 'string') {
        const data = db.collection("users").doc(userID);
        const doc = await data.get();
        let userData = doc.data();
        if (userData && userData['data'] && userData['data'][date]) {
            console.log("replacing " + exerciseOld + " with " + exerciseNew);
            const exercises: string[] = userData['data'][date]
            const index = exercises.indexOf(exerciseOld)
            exercises[index] = exerciseNew
            await data.set({
                data: {
                    ...userData['data'],
                    [date]: exercises
                }
            })
        }
    } else {
        res.status(404).send({status: "User Not Found"})
    }
}

export const deleteData = async (req: SafeRequest, res: SafeResponse) => {
    const date = req.body.date as string;
    const userID = req.body.userID as string;
    const exercise = req.body.delExercise as string;
    if (typeof userID === 'string') {
        const data = db.collection("users").doc(userID)
        const doc = await data.get();
        let userData = doc.data();
        if (userData && userData['data'] && userData['data'][date]) {
            const exercises: string[] = userData['data'][date]
            const index = exercises.indexOf(exercise)
            let lastExercise = exercises[exercises.length - 1]
            exercises[exercises.length - 1] = exercise
            exercises[index] = lastExercise
            exercises.pop()
            if (exercises.length === 0) {
                delete userData['data'][date]
                await data.set({
                    data: {
                        ...userData['data']
                    }
                    
                })
            } else {
                await data.set({
                    data: {
                        ...userData['data'],
                        [date]:exercises
                    }
                })
            }
            
        }
    } else {
        res.status(404).send({status: "User not found"})
    }
}

const DBchange = async (userID : string, newData : DataMap) : Promise<any> => {
    if (newData)
    await db.collection('users').doc(userID).set({
        data: newData['data']
    });
};

const testDBchange = async (): Promise<any> => {
    await db.collection('users').doc('test').set({
        data: 'Change it to Yang',
    });
};

const testDBAddMatrix = async (): Promise<any> => {
    await db.collection('users').doc('user_2ypnofjP8HiE3khsBWlsSfBfKuf').set({
        data: {
            "2025-06-20" : ["a", "b"],
            "2025-06-21" : ["c", "d"],
            "2025-06-22" : ["e", "f"]
        }}, { merge: true }
    );
}