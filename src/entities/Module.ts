export interface ModuleProps {
    id?: string;
    title: string;
    courseId: string;
    orderIndex?: number;
    createdAt?: Date;
}

export class Module {
    public readonly id?: string;
    public readonly courseId: string;
    public readonly createdAt: Date;

    private _title!: string;
    private _orderIndex: number;

    constructor(props: ModuleProps) {
        this.id = props.id;
        this.courseId = props.courseId;
        this.createdAt = props.createdAt || new Date(); // cria a data atual se não informada

        // define a ordem padrão como 0 se não for informada
        this._orderIndex = props.orderIndex ?? 0;

        this.setTitle(props.title);
    }

    // define o título do módulo e verifica se tem tamanho mínimo
    public setTitle(title: string) {
        if (!title || title.trim().length < 3) {
            throw new Error("O título deve ter no mínimo 3 caracteres.");
        }
        this._title = title.trim();
    }

    // define a posição do módulo na lista
    public setOrderIndex(orderIndex: number) {
        if (!Number.isInteger(orderIndex)) {
            throw new Error("A ordem deve ser um número inteiro.");
        }
        this._orderIndex = orderIndex;
    }

    public get title(): string {
        return this._title;
    }

    public get orderIndex(): number {
        return this._orderIndex;
    }

    // transforma os dados do módulo em um formato simples para enviar na resposta
    public toJSON() {
        return {
            id: this.id,
            title: this.title,
            courseId: this.courseId,
            orderIndex: this.orderIndex,
            createdAt: this.createdAt
        };
    }
}
