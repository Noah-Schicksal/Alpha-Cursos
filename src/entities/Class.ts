
export interface ClassProps {
    id?: string;
    title: string;
    description?: string;
    videoUrl?: string;
    materialUrl?: string;
    moduleId: string;
    createdAt?: Date;
}


export class Class {
    public readonly id?: string;
    public readonly createdAt: Date;

    private _title!: string;
    private _description?: string;
    private _videoUrl?: string;
    private _materialUrl?: string;
    private _moduleId!: string;

    constructor(props: ClassProps) {
        this.id = props.id;
        this.createdAt = props.createdAt || new Date();

        this.setTitle(props.title);
        this.setDescription(props.description);
        this.setVideoUrl(props.videoUrl);
        this.setMaterialUrl(props.materialUrl);
        this.setModuleId(props.moduleId);
    }


    public setTitle(title: string) {
        if (!title || title.trim().length < 3) {
            throw new Error("O título da aula deve ter no mínimo 3 caracteres.");
        }
        this._title = title.trim();
    }

    public setDescription(description?: string) {
        if (description && description.trim().length < 10) {
            throw new Error("A descrição deve ter no mínimo 10 caracteres.");
        }
        this._description = description?.trim();
    }

    public setVideoUrl(videoUrl?: string) {
        if (videoUrl && !this.isValidUrl(videoUrl)) {
            throw new Error("A URL do vídeo é inválida.");
        }
        this._videoUrl = videoUrl;
    }

    public setMaterialUrl(materialUrl?: string) {
        if (materialUrl && !this.isValidUrl(materialUrl)) {
            throw new Error("A URL do material é inválida.");
        }
        this._materialUrl = materialUrl;
    }

    public setModuleId(moduleId: string) {
        if (!moduleId || moduleId.trim().length === 0) {
            throw new Error("O moduleId é obrigatório.");
        }
        this._moduleId = moduleId;
    }



    get title(): string { return this._title; }
    get description(): string | undefined { return this._description; }
    get videoUrl(): string | undefined { return this._videoUrl; }
    get materialUrl(): string | undefined { return this._materialUrl; }
    get moduleId(): string { return this._moduleId; }


    private isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }


    public toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            videoUrl: this.videoUrl,
            materialUrl: this.materialUrl,
            moduleId: this.moduleId,
            createdAt: this.createdAt
        };
    }
}
