export interface ClassMaterial {
    id: number;
    title: string;
    className: string;
    file_path: string;
    file_type: string;
    createdBy: string;
    created_at: Date;
    updated_at?: Date;
    classID: number;
    downloadCount?: number;
}
