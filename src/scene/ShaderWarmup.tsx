import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { BoxGeometry, Mesh, Scene } from "three";
import { inkModelOf } from "./inkModel";
import { modelUrl, PROP_MODELS, type PropName } from "./props";

const NAMES = Object.keys(PROP_MODELS) as PropName[];

/**
 * Compiles the shaders of every prop's coloured version at load time. Those colours are only drawn when a
 * station becomes active, and a shader compiled on first use freezes the page for a moment right then, as you
 * scroll. compileAsync compiles off the main thread where the browser allows it, against the live scene's
 * lights (the program depends on them), and the programs are then cached for the materials' lifetime.
 */
export default function ShaderWarmup() {
  const { gl, camera, scene } = useThree();
  // Suspends until every prop model has loaded (they're preloaded, so usually already done).
  const loaded = useGLTF(NAMES.map(modelUrl));

  useEffect(() => {
    const materials = new Set(loaded.flatMap((gltf) => inkModelOf(gltf.scene).colours));
    const box = new BoxGeometry(0.01, 0.01, 0.01);
    const warmup = new Scene();
    for (const material of materials) warmup.add(new Mesh(box, material));
    void gl.compileAsync(warmup, camera, scene).finally(() => box.dispose());
  }, [gl, camera, scene, loaded]);

  return null;
}
