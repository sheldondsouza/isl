export const I_AM_FINE = (ref) => {
    let animations = [];

    // === I ===
    // Point to yourself (index finger touches chest)
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 9, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);

    // Move right arm to chest
    animations.push(["mixamorigRightArm", "rotation", "x", Math.PI / 5, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", -Math.PI / 8, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 8, "-"]);

    ref.animations.push(animations);

    // === AM ===
    // Optional – implied or can be represented with calm hand posture (can skip)
    animations = [];
    ref.animations.push(animations);

    // === FINE ===
    animations = [];

    // Open palm, fingers spread
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 12, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI / 16, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 16, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 12, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", -Math.PI / 8, "-"]);

    // Hand moves forward a bit, palm outward
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 10, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);

    // === Return to neutral ===
    animations = [];
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
};
