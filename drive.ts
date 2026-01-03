namespace keyestudioPro {

    let speedLF = 50
    let speedLB = 50
    let speedRF = 50
    let speedRB = 50

    function clampSpeed(pct: number): number {
        if (pct < 0) return 0
        if (pct > 100) return 100
        return pct
    }

    function setAll(pct: number) {
        const s = clampSpeed(pct)
        speedLF = s
        speedLB = s
        speedRF = s
        speedRB = s
    }

    /**
     * Sett standardfart for alle hjul.
     */
    //% block="sett standardfart %fart"
    //% fart.min=0 fart.max=100 fart.defl=50
    //% group="Kjøring"
    export function setStandardFart(fart: number): void {
        setAll(fart)
    }

    /**
     * Kjør framover med fart i prosent.
     */
    //% block="kjør framover med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function framover(fart: number): void {
        setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speedLF)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speedLB)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speedRF)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speedRB)
    }

    /**
     * Kjør bakover med fart i prosent.
     */
    //% block="kjør bakover med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function bakover(fart: number): void {
        setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, speedLF)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speedLB)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, speedRF)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, speedRB)
    }

    /**
     * Snu på stedet mot venstre.
     */
    //% block="snu venstre med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function snuVenstre(fart: number): void {
        setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, speedLF)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speedLB)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speedRF)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speedRB)
    }

    /**
     * Snu på stedet mot høyre.
     */
    //% block="snu høyre med fart %fart"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function snuHoyre(fart: number): void {
        setAll(fart)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speedLF)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speedLB)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, speedRF)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, speedRB)
    }

    /**
     * Stopp alle motorer.
     */
    //% block="stopp"
    //% group="Kjøring"
    export function stopp(): void {
        mecanumRobotV2.state()
    }
}