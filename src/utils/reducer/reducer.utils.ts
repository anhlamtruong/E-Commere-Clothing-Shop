import { AnyAction } from "redux";
//* Return type
// type MyFunc = () => string;
// type MyReturn = ReturnType<MyFunc>;
//*Example of predicate function:
// type Alien = {
//   fly: () => {};
// };
// type Human = {
//   speak: () => {};
// };
//n function isHuman(entity: Human | Alien): entity is Human {
//   return (entity as Human).speak !== undefined;
// }
//* Intersection type
// type Human = {
//   name: string;
// };
// type Alien = {
//   fly: () => void;
// };

// type Hybrid = Human | Alien;
// const Josh:Hybrid ={
//   name:'josh',
//   fly:()=>{}
// }
//* A checker type say that AC[type]-string ===  action
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

//* withMake<AC includes type:string>(AC) : Matchable<AC> - a checker
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

//*regular js method.
// export const createAction = (type, payload) => ({ type, payload });
