export type ProgressStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface ProgressProps {
    id?: string;
    userId: string;
    referenceId: string; // id do curso/lesson/item associado
    percent: number; // 0-100
    status: ProgressStatus | string;
    updatedAt?: Date;
}

export class Progress {
    public readonly id?: string;
    public readonly updatedAt: Date;

    private _userId!: string;
    private _referenceId!: string;
    private _percent!: number;
    private _status!: ProgressStatus;

    constructor(props: ProgressProps) {
        this.id = props.id;
        this.updatedAt = props.updatedAt || new Date();

        this.setUserId(props.userId);
        this.setReferenceId(props.referenceId);
        this.setPercent(props.percent);
        this.setStatus(props.status);
    }

    public setUserId(userId: string) {
        if (!userId || userId.trim().length === 0) {
            throw new Error('Regra de Negócio: `userId` inválido.');
        }
        this._userId = userId;
    }

    public setReferenceId(referenceId: string) {
        if (!referenceId || referenceId.trim().length === 0) {
            throw new Error('Regra de Negócio: `referenceId` inválido.');
        }
        this._referenceId = referenceId;
    }

    public setPercent(percent: number) {
        if (typeof percent !== 'number' || percent < 0 || percent > 100) {
            throw new Error('Regra de Negócio: `percent` deve estar entre 0 e 100.');
        }
        this._percent = percent;
    }

    public setStatus(status: string) {
        if (status !== 'NOT_STARTED' && status !== 'IN_PROGRESS' && status !== 'COMPLETED') {
            throw new Error("Regra de Negócio: `status` deve ser 'NOT_STARTED', 'IN_PROGRESS' ou 'COMPLETED'.");
        }
        this._status = status as ProgressStatus;
    }

    // --- Getters ---
    get userId(): string { return this._userId; }
    get referenceId(): string { return this._referenceId; }
    get percent(): number { return this._percent; }
    get status(): ProgressStatus { return this._status; }

    public toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            referenceId: this.referenceId,
            percent: this.percent,
            status: this.status,
            updatedAt: this.updatedAt
        };
    }
}
