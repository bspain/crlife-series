import { Request, Response } from "express-serve-static-core";

export interface ModuleRequestHandler {
    requestHandler(request: Request, response: Response) : void;
}