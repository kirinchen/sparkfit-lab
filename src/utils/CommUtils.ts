
export class CommUtils {
    // Singleton 模式：靜態私有實例
    private static _instance: CommUtils;

    private constructor() {
        console.log("ModelService Initialized!");
    }

    public static randInt(): number {
        const max = 1_000_000_000; // 0 到 10^9-1 的整數
        return Math.floor(Math.random() * max);
    }

    public static clone<T>(o: T): T {
        try {
            if (typeof structuredClone === 'function') return structuredClone(o);
            return JSON.parse(JSON.stringify(o)) as T;
        } catch {
            return JSON.parse(JSON.stringify(o)) as T;
        }
    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new CommUtils();
        }
        return this._instance;
    }

}