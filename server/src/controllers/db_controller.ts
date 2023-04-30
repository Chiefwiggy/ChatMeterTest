import ErrorHandler from "../errors/error_handler";
import DataModel from "../models/DataSchema";
import { v4 as uuidv4 } from 'uuid';


export const SendUrl = async (req: any, res: any) => {
    try {
        if (await CheckIfExists(req.body, req.get("X-User"))) {
            res.status(202).send("Successfully updated: " + req.body.url);
        } else {
            const data = new DataModel({...req.body, userId: req.get('X-User')});
            await data.save()
            res.status(201).send("Successfully added: " + req.body.url);
        }
    }
    catch (err) {
        ErrorHandler(err, req, res, null);
    } 
}

interface CurrentDataModelData {
    url: string,
    title: string,
    favicon?: string
}

const CheckIfExists = async(data: CurrentDataModelData, user: string): Promise<boolean> => {
    try {
        const retVal = await DataModel.findOneAndUpdate({userId: user, ...data}, {timeAccessed: Date.now()}, {new: true})
        return !!retVal;
    } catch (err) {
        return false;
    }
    
}



export const GetAll = async (req: any, res: any) => {
    try {
        const result = await DataModel.find({userId: req.get("X-User")});
        res.status(200).json(result);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const GenerateUser = async(req: any, res: any) => {
    res.status(201).json({userId: uuidv4()})
}

export const CleanUp = async(req: any, res: any) => {
    try {
        const result = await DataModel.deleteMany({ userId: req.params.id });
        res.status(200).json({ message: `Deleted ${result.deletedCount} objects` });
    } catch (err) {
        res.status(404).send("Nothing found.");
    }
}