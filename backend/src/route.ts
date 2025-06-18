import type {Request, Response} from "express";
import type {ParamsDictionary} from "express-serve-static-core";

type SafeRequest = Request<ParamsDictionary, object, Record<string, unknown>>;
type SafeResponse = Response;

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