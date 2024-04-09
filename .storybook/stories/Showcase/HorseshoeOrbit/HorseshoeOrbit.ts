import { CelestialBody, CoMTransformation, PinTransformation, RotateTransformation, RungeKutta4Sim, State, Universe, Vector3 } from "../../../../src";

const yorpState = new State([
  new CelestialBody(
    "Sun",
    1988500e24,
  696340e3,
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "Earth",
    5.97219e24,
      6371e3,
    new Vector3(
      -2.48109932596539e10,
      1.449948612736719e11,
      -8.215203670851886e6
    ),
    new Vector3(
      -2.984146365518679e4,
      -5.126262286859617e3,
      1.184224839788195
    ),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "YORP",
    1,
    1,
    new Vector3(
      1.789598196203594e11,
      4.67757011067789e10,
      5.131735873924753e9
    ),
    new Vector3(
      -5.641374152889482e3,
      2.28178307950743e4,
      -6.507224186314708e1
    ),
    new Vector3(0, 0, 0)
  )]);
const yorp = new Universe({
  label: "54509 YORP",
  currState: new RotateTransformation(new Vector3(1, 0, 0), Math.PI / 2).transform(yorpState.clone()),
  simFunc: new RungeKutta4Sim(),
  color: ["#FDB813", "#287AB8", "#767676"],
  transformations: [
    new CoMTransformation(),
    new PinTransformation(new Vector3(1, 0, 0), 1),
  ],
});

export const horseshoe = {
  yorp: yorp,
};