export const HOW_ARE_YOU = (ref) => {
    let animations = [];

    // === HOW ===
    // Curl both hands slightly, palms facing down then rotate one hand
    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 6, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", Math.PI / 12, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "x", -Math.PI / 6, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", -Math.PI / 12, "+"]);
    
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 6, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI / 6, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 6, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 6, "+"]);

    animations.push(["mixamorigLeftHandIndex1", "rotation", "z", Math.PI / 6, "+"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", Math.PI / 6, "+"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", Math.PI / 6, "+"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", Math.PI / 6, "+"]);

    // Right hand twist for emphasis (like asking "how?")
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 4, "+"]);

    ref.animations.push(animations);

    // === ARE (optional or implied) ===
    animations = [];
    // You can add a pause or hand-to-chest if needed for expression.

    ref.animations.push(animations);

    // === YOU ===
    animations = [];
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 8, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
    
    // Extend right arm forward as pointing gesture
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 8, "+"]);

    ref.animations.push(animations);

    // Return to neutral position
    animations = [];
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);

    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
};
