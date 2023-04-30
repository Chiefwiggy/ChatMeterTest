import {Model, Schema, model} from 'mongoose';


interface IDataSchema {
    url: string,
    title: string,
    favicon: string,
    userId: string,
    timeAccessed: Date;
}

const URLValidator = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

const WebSchema = new Schema<IDataSchema>({
    url: { type: String, required: true,
        validate: { 
            validator: URLValidator,
            message: properties => `${properties.value} is an invalid URL`
        }
    },
    title: { type: String, required: true },
    favicon: { type: String, required: true,
        validate: { 
            validator: URLValidator,
            message: properties => `${properties.value} is an invalid URL`
        } 
    },
    userId: { type: String, required: true},
    timeAccessed: { type: Date, default: Date.now },
});


//this tests whether the combo of user and url is unique
WebSchema.index({user: 1, url: 1}, {unique: true});

const DataModel: Model<IDataSchema> = model<IDataSchema>('webdatas', WebSchema);


export default DataModel;