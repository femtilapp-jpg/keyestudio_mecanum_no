enum KjorRetning {
    //% block="↑ framover"
    Framover,
    //% block="↓ bakover"
    Bakover
}

enum SnuRetning {
    //% block="↺ venstre"
    Venstre,
    //% block="↻ høyre"
    Hoyre
}

enum BueRetning {
    //% block="⤺ bue venstre"
    Venstre,
    //% block="⤻ bue høyre"
    Hoyre
}

namespace keyestudioPro {

    // Startverdier
    let wheelDiameterMm = 60

    // Kalibreringer (finjusteres på gulvet)
    // cm per sekund når fart = 100
    let cmPerSecAt100 = 25

    // grader per sekund ved snu fart = 100
    let degPerSecAt100 = 180

    function clampSpeed(pct: number): number {
        if (pct < 0) return 0
        if (pct > 100) return 100
        return pct
    }

    function clampPositive(n: number): number {
        if (n < 0) return 0
        return n
    }

    function setAllForward(speed: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed)
    }

    function setAllBackward(speed: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, speed)
    }

    function spinLeft(speed: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed)
    }

    function spinRight(speed: number) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, speed)
    }

    function curveLeft(speed: number) {
        const inner = Math.round(speed * 0.5)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, inner)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, inner)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed)
    }

    function curveRight(speed: number) {
        const inner = Math.round(speed * 0.5)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, inner)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, inner)
    }

    function calcMsForCm(cm: number, fart: number): number {
        const s = clampSpeed(fart)
        if (s === 0) return 0

        const cmps = (cmPerSecAt100 * s) / 100
        if (cmps <= 0) return 0

        return Math.round((cm / cmps) * 1000)
    }

    function calcMsForDeg(deg: number, fart: number): number {
        const s = clampSpeed(fart)
        if (s === 0) return 0

        const dps = (degPerSecAt100 * s) / 100
        if (dps <= 0) return 0

        return Math.round((deg / dps) * 1000)
    }

    /**
     * Stopp alle motorer.
     */
    //% block="stopp"
    //% group="Kjøring"
    export function stopp(): void {
        mecanumRobotV2.state()
    }

    /**
     * Sett hjuldiameter i mm (standard: 60 mm).
     */
    //% block="sett hjuldiameter %mm mm"
    //% mm.min=10 mm.max=200 mm.defl=60
    //% group="Start"
    export function settHjuldiameter(mm: number): void {
        wheelDiameterMm = clampPositive(mm)
    }

    /**
     * Sett kalibrering: cm per sekund ved fart 100.
     * Tips: kjør 100 cm på fart 100, mål tid, regn ut 100 / sekunder.
     */
    //% block="sett kalibrering %cmps cm per sekund ved fart 100"
    //% cmps.min=1 cmps.max=200 cmps.defl=25
    //% group="Start"
    export function settKalibreringCmPerSek(cmps: number): void {
        cmPerSecAt100 = clampPositive(cmps)
    }

    /**
     * Sett kalibrering: grader per sekund ved snu fart 100.
     * Tips: snu 360 grader på fart 100, mål tid, regn ut 360 / sekunder.
     */
    //% block="sett kalibrering %dps grader per sekund ved snu fart 100"
    //% dps.min=10 dps.max=1000 dps.defl=180
    //% group="Start"
    export function settKalibreringGraderPerSek(dps: number): void {
        degPerSecAt100 = clampPositive(dps)
    }

    /**
     * Kjør framover eller bakover.
     */
    //% block="kjør %retning med fart %fart \\%"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function kjor(retning: KjorRetning, fart: number): void {
        const s = clampSpeed(fart)
        if (retning === KjorRetning.Framover) {
            setAllForward(s)
        } else {
            setAllBackward(s)
        }
    }

    /**
     * Kjør framover eller bakover i gitt tid.
     */
    //% block="kjør %retning med fart %fart \\% i %ms ms"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% ms.min=10 ms.max=10000 ms.defl=500
    //% group="Kjøring"
    export function kjorTid(retning: KjorRetning, fart: number, ms: number): void {
        kjor(retning, fart)
        basic.pause(ms)
        stopp()
    }

    /**
     * Kjør et antall cm framover eller bakover (tidsbasert, krever kalibrering).
     */
    //% block="kjør %retning %cm cm med fart %fart \\%"
    //% cm.min=1 cm.max=500 cm.defl=50
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function kjorCm(retning: KjorRetning, cm: number, fart: number): void {
        const dist = clampPositive(cm)
        const s = clampSpeed(fart)
        const ms = calcMsForCm(dist, s)
        if (ms <= 0) return

        kjor(retning, s)
        basic.pause(ms)
        stopp()
    }

    /**
     * Snu på stedet.
     */
    //% block="snu %retning med fart %fart \\%"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function snu(retning: SnuRetning, fart: number): void {
        const s = clampSpeed(fart)
        if (retning === SnuRetning.Venstre) {
            spinLeft(s)
        } else {
            spinRight(s)
        }
    }

    /**
     * Snu på stedet i gitt tid.
     */
    //% block="snu %retning med fart %fart \\% i %ms ms"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% ms.min=10 ms.max=10000 ms.defl=500
    //% group="Kjøring"
    export function snuTid(retning: SnuRetning, fart: number, ms: number): void {
        snu(retning, fart)
        basic.pause(ms)
        stopp()
    }

    /**
     * Snu et antall grader (tidsbasert, krever kalibrering).
     */
    //% block="snu %retning %grader grader med fart %fart \\%"
    //% grader.min=1 grader.max=720 grader.defl=90
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function snuGrader(retning: SnuRetning, grader: number, fart: number): void {
        const deg = clampPositive(grader)
        const s = clampSpeed(fart)
        const ms = calcMsForDeg(deg, s)
        if (ms <= 0) return

        snu(retning, s)
        basic.pause(ms)
        stopp()
    }

    /**
     * Kjør i bue (venstre/høyre).
     */
    //% block="kjør bue %retning med fart %fart \\%"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% group="Kjøring"
    export function kjorBue(retning: BueRetning, fart: number): void {
        const s = clampSpeed(fart)
        if (retning === BueRetning.Venstre) {
            curveLeft(s)
        } else {
            curveRight(s)
        }
    }

    /**
     * Kjør i bue i gitt tid.
     */
    //% block="kjør bue %retning med fart %fart \\% i %ms ms"
    //% fart.min=0 fart.max=100 fart.defl=60
    //% ms.min=10 ms.max=10000 ms.defl=500
    //% group="Kjøring"
    export function kjorBueTid(retning: BueRetning, fart: number, ms: number): void {
        kjorBue(retning, fart)
        basic.pause(ms)
        stopp()
    }

    /**
     * Les hjuldiameter (mest for debugging).
     */
    //% block="hjuldiameter mm"
    //% group="Avansert"
    export function hjuldiameterMm(): number {
        return wheelDiameterMm
    }
}
