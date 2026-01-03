enum KjorModus {
    //% block="↑ fram"
    Fram,
    //% block="↓ bak"
    Bak,

    //% block="← side venstre"
    SideVenstre,
    //% block="→ side høyre"
    SideHoyre,

    //% block="↖ fram venstre"
    FramVenstre,
    //% block="↗ fram høyre"
    FramHoyre,
    //% block="↙ bak venstre"
    BakVenstre,
    //% block="↘ bak høyre"
    BakHoyre,

    //% block="↺ snu venstre"
    SnuVenstre,
    //% block="↻ snu høyre"
    SnuHoyre,

    //% block="⤺ bue venstre"
    BueVenstre,
    //% block="⤻ bue høyre"
    BueHoyre
}

namespace keyestudioPro {

    function clampSpeed(pct: number): number {
        if (pct < 0) return 0
        if (pct > 100) return 100
        return pct
    }

    function motorsStop(): void {
        mecanumRobotV2.state()
    }

    function setAllForward(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, s)
    }

    function setAllBackward(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, s)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, s)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, s)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, s)
    }

    function spinLeft(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, s)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, s)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, s)
    }

    function spinRight(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, s)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, s)
    }

    function strafeLeft(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, s)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, s)
    }

    function strafeRight(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, s)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, s)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, s)
    }

    function diagFramVenstre(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, 0)
    }

    function diagFramHoyre(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, s)
    }

    function diagBakVenstre(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, s)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, s)
    }

    function diagBakHoyre(s: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, 0)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, s)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, s)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, 0)
    }

    function curveLeft(s: number) {
        const inner = Math.round(s * 0.5)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, inner)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, inner)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, s)
    }

    function curveRight(s: number) {
        const inner = Math.round(s * 0.5)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, s)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, inner)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, inner)
    }

    function applyMode(mode: KjorModus, fart: number): void {
        const s = clampSpeed(fart)

        switch (mode) {
            case KjorModus.Fram: setAllForward(s); break
            case KjorModus.Bak: setAllBackward(s); break

            case KjorModus.SideVenstre: strafeLeft(s); break
            case KjorModus.SideHoyre: strafeRight(s); break

            case KjorModus.FramVenstre: diagFramVenstre(s); break
            case KjorModus.FramHoyre: diagFramHoyre(s); break
            case KjorModus.BakVenstre: diagBakVenstre(s); break
            case KjorModus.BakHoyre: diagBakHoyre(s); break

            case KjorModus.SnuVenstre: spinLeft(s); break
            case KjorModus.SnuHoyre: spinRight(s); break

            case KjorModus.BueVenstre: curveLeft(s); break
            case KjorModus.BueHoyre: curveRight(s); break
        }
    }

    /**
     * Stopp alle motorer.
     */
    //% block="stopp"
    //% group="Kjøring"
    export function stopp(): void {
        motorsStop()
    }

    /**
     * Kjør i valgt retning.
     */
    //% block="kjør %modus med fart %fart \\%"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function kjorModus(modus: KjorModus, fart: number): void {
        applyMode(modus, fart)
    }

    /**
     * Kjør i valgt retning i gitt tid.
     */
    //% block="kjør %modus med fart %fart \\% i %ms ms"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% ms.min=10 ms.max=10000 ms.defl=500
    //% group="Kjøring"
    export function kjorModusTid(modus: KjorModus, fart: number, ms: number): void {
        applyMode(modus, fart)
        basic.pause(ms)
        motorsStop()
    }
}