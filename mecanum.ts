enum DiagonalRetning {
    //% block="↖ fram venstre"
    FramVenstre,
    //% block="↗ fram høyre"
    FramHoyre,
    //% block="↙ bak venstre"
    BakVenstre,
    //% block="↘ bak høyre"
    BakHoyre
}

namespace keyestudioPro {

    function clampSpeed(pct: number): number {
        if (pct < 0) return 0
        if (pct > 100) return 100
        return pct
    }

    function diagonalKjor(retning: DiagonalRetning, fart: number): void {
        const s = clampSpeed(fart)

        switch (retning) {
            case DiagonalRetning.FramVenstre:
                mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 0)
                mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, s)
                mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, s)
                mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, 0)
                break

            case DiagonalRetning.FramHoyre:
                mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, s)
                mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 0)
                mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 0)
                mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, s)
                break

            case DiagonalRetning.BakVenstre:
                mecanumRobotV2.Motor(LR.Upper_left, MD.Back, s)
                mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 0)
                mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 0)
                mecanumRobotV2.Motor(LR.Lower_right, MD.Back, s)
                break

            case DiagonalRetning.BakHoyre:
                mecanumRobotV2.Motor(LR.Upper_left, MD.Back, 0)
                mecanumRobotV2.Motor(LR.Lower_left, MD.Back, s)
                mecanumRobotV2.Motor(LR.Upper_right, MD.Back, s)
                mecanumRobotV2.Motor(LR.Lower_right, MD.Back, 0)
                break
        }
    }

    /**
     * Kjør diagonalt i valgt retning.
     */
    //% block="kjør diagonalt %retning med fart %fart \\%"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function diagonal(retning: DiagonalRetning, fart: number): void {
        diagonalKjor(retning, fart)
    }

    /**
     * Kjør diagonalt i valgt retning i en gitt tid.
     */
    //% block="kjør diagonalt %retning med fart %fart \\% i %ms ms"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% ms.min=10 ms.max=10000 ms.defl=500
    //% group="Kjøring"
    export function diagonalTid(retning: DiagonalRetning, fart: number, ms: number): void {
        diagonalKjor(retning, fart)
        basic.pause(ms)
        stopp()
    }
}