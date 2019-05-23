// 声明全局window对象
declare var window: Window;
declare var document: Document;

interface APIResult<T> {
    code: number
    msg: string
    data?: T
}
