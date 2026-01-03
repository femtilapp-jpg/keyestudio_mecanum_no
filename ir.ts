namespace keyestudioPro {

  let irPin: DigitalPin = DigitalPin.P16
  let irLast = 0
  let irReady = false

  /**
   * Velg hvilken pin IR-mottakeren står på.
   */
  //% block="IR pin %pin"
  //% group="IR"
  export function irSettPin(pin: DigitalPin): void {
    irPin = pin
    irReady = false
  }

  function ensureIr(): void {
    if (irReady) return

    IR.init(irPin)
    irReady = true

    control.inBackground(function () {
      while (true) {
        const code = IR.getCode()
        if (code != 0) {
          irLast = code
        }
        basic.pause(10)
      }
    })
  }

  /**
   * Start IR (må kjøres i 'Ved oppstart').
   */
  //% block="start IR"
  //% group="IR"
  export function irStart(): void {
    ensureIr()
  }

  /**
   * Siste IR-kode (0 betyr ingen).
   */
  //% block="siste IR kode"
  //% group="IR"
  export function irSisteKode(): number {
    ensureIr()
    return irLast
  }

  /**
   * Nullstill siste IR-kode.
   */
  //% block="nullstill IR kode"
  //% group="IR"
  export function irNullstill(): void {
    irLast = 0
  }

  /**
   * Når IR-kode mottas.
   */
  //% block="når IR kode mottas"
  //% group="IR"
  export function irNarKodeMottas(handler: () => void): void {
    ensureIr()

    control.inBackground(function () {
      let lastSeen = 0
      while (true) {
        if (irLast != 0 && irLast != lastSeen) {
          lastSeen = irLast
          handler()
        }
        basic.pause(10)
      }
    })
  }

  /**
   * Sjekk om siste IR-kode er lik en bestemt kode.
   */
  //% block="IR kode er %kode"
  //% group="IR"
  export function irErKode(kode: number): boolean {
    ensureIr()
    return irLast === kode
  }
}
