namespace keyestudioPro {

  let irStarted = false
  let lastButton = 0

  function ensureIR(): void {
    if (irStarted) return

    irReceiver.connectInfrared(DigitalPin.P16)
    irStarted = true

    control.inBackground(function () {
      while (true) {
        const b = irReceiver.returnIrButton()
        if (b != 0) {
          lastButton = b
        }
        basic.pause(10)
      }
    })
  }

  /**
   * Start IR-mottaker (legg i "Ved oppstart")
   */
  //% block="start IR"
  //% group="IR"
  export function startIR(): void {
    ensureIR()
  }

  /**
   * Siste IR-knapp (0 = ingen)
   */
  //% block="siste IR knapp"
  //% group="IR"
  export function sisteIRKnapp(): number {
    ensureIR()
    return lastButton
  }

  /**
   * Nullstill siste IR-knapp
   */
  //% block="nullstill IR"
  //% group="IR"
  export function nullstillIR(): void {
    lastButton = 0
  }
}
