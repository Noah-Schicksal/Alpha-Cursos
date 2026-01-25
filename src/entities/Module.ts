export interface ModuleProps {
    id?: string;
    title: string;
    courseId: string;
    createdAt?: Date;
}

export class Module {
    public readonly id?: string;
    public readonly createdAt: Date;

    private _title!: string;
    private _courseId!: string;

    constructor(props: ModuleProps) {
        this.id = props.id;
        this.createdAt = props.createdAt || new Date();

        this.setTitle(props.title);
        this.setCourseId(props.courseId);
    }

    public setTitle(title: string) {
        if (!title || title.trim().length < 3) {
            throw new Error("O título do módulo deve ter no mínimo 3 caracteres.");
        }
        this._title = title.trim();
    }

    public setCourseId(courseId: string) {
        if (!courseId || courseId.trim().length === 0) {
            throw new Error("O courseId é obrigatório.");
        }
        this._courseId = courseId;
    }


    get title(): string {
        return this._title;
    }

    get courseId(): string {
        return this._courseId;
    }



    public toJSON() {
        return {
            id: this.id,
            title: this.title,
            courseId: this.courseId,
            createdAt: this.createdAt
        };
    }
}
