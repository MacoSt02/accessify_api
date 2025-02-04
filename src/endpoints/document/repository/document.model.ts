export type PostDocumentBody = {
    document_name: string;
    document_description?: string;
};

export type PutDocumentBody = {
    document_name?: string;
    document_description?: string;
};
