import encryptRaw from './encrypt'
import decryptRaw from './decrypt'
import { MnemonicKey, Wallet } from '@terra-money/feather.js'
import { AllLCDClients } from '@anchor-protocol/app-provider'

export type MnemonicStore = string[]

export function encrypt(mnemonic: MnemonicStore, pass: string) {
    return encryptRaw(JSON.stringify(mnemonic), pass)
}

export function decrypt(encryptedMessage: string, pass: string) {
    const decrypted = decryptRaw(encryptedMessage, pass)
    return JSON.parse(decrypted)
}

export function getKey(words: string[]): MnemonicKey{
    return new MnemonicKey({mnemonic: words.join(" ")});
}