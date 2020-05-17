import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initialState", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      redirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(undefined, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: "abcdef",
        userId: "goober",
      })
    ).toEqual({
      token: "abcdef",
      userId: "goober",
      error: null,
      loading: false,
      redirectPath: "/",
    });
  });
});
