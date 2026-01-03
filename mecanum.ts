namespace keyestudioPro {

    function clampSpeed(pct: number): number {
        if (pct < 0) return 0
        if (pct > 100) return 100
        return pct
    }

    function setAll(pct: number): { lf: number, lb: number, rf: number, rb: number } {
        const s = clampSpeed(pct)
        return { lf: s, lb: s, rf: s, rb: s }
    }

    /**
     * Strafe venstre med mecanumhjul.
     */
    //% block="kjør sideveis venstre med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Mecanum"
    export function strafeVenstre(fart: number): void {
        const s = setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, s.lf)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, s.lb)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, s.rf)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, s.rb)
    }

    /**
     * Strafe høyre med mecanumhjul.
     */
    //% block="kjør sideveis høyre med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Mecanum"
    export function strafeHoyre(fart: number): void {
        const s = setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, s.lf)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, s.lb)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, s.rf)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, s.rb)
    }

    /**
     * Kjør diagonalt fram venstre.
     */
    //% block="kjør diagonalt fram venstre med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Mecanum"
    export function diagonalFramVenstre(fart: number): void {
        const s = setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, s.lb)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, s.rf)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, 0)
    }

    /**
     * Kjør diagonalt fram høyre.
     */
    //% block="kjør diagonalt fram høyre med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Mecanum"
    export function diagonalFramHoyre(fart: number): void {
        const s = setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, s.lf)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, s.rb)
    }

    /**
     * Kjør diagonalt bak venstre.
     */
    //% block="kjør diagonalt bak venstre med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Mecanum"
    export function diagonalBakVenstre(fart: number): void {
        const s = setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, s.lf)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 0)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, s.rb)
    }

    /**
     * Kjør diagonalt bak høyre.
     */
    //% block="kjør diagonalt bak høyre med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Mecanum"
    export function diagonalBakHoyre(fart: number): void {
        const s = setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, 0)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, s.lb)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, s.rf)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, 0)
    }
}