namespace keyestudioPro {
  let _irPin: DigitalPin = DigitalPin.P16
  let _started = false
  let _lastBtn: number = 0

  function ensureStarted(): void {
    if (_started) return
    irReceiver.connectInfrared(_irPin)
    _started = true

    control.inBackground(function () {
      while (true) {
        const b = irReceiver.returnIrButton()
        if (b != 0) {
          _lastBtn = b
        }
        basic.pause(10)
      }
    })
  }

  /**
   * Velg hvilken pin IR-mottakeren står på.
   */
  //% block="IR pin %pin"
  //% group="IR"
  export function irPin(pin: DigitalPin): void {
    _irPin = pin
    _started = false
  }

  /**
   * Start IR (legg i Ved oppstart).
   */
  //% block="start IR"
  //% group="IR"
  export function startIR(): void {
    ensureStarted()
  }

  /**
   * Siste IR-knapp (tall). 0 betyr ingen.
   */
  //% block="siste IR knapp"
  //% group="IR"
  export function sisteIRKnapp(): number {
    ensureStarted()
    return _lastBtn
  }

  /**
   * Nullstill siste IR-knapp.
   */
  //% block="nullstill IR"
  //% group="IR"
  export function nullstillIR(): void {
    _lastBtn = 0
  }

  /**
   * Når IR-knapp trykkes.
   */
  //% block="når IR knapp trykkes"
  //% group="IR"
  export function narIRKnappTrykkes(handler: () => void): void {
    ensureStarted()

    control.inBackground(function () {
      let lastSeen = 0
      while (true) {
        const b = _lastBtn
        if (b != 0 && b != lastSeen) {
          lastSeen = b
          handler()
        }
        basic.pause(10)
      }
    })
  }

  /**
   * IR knapp er lik %knapp
   */
  //% block="IR knapp er %knapp"
  //% group="IR"
  export function irKnappEr(knapp: number): boolean {
    ensureStarted()
    return _lastBtn === knapp
  }
}
