import { Component, Injector } from '@angular/core';
import { BaseList } from '../../../core/component/base-list';
import { CustomerService } from '../../../service/customer.service';
import { Customer } from '../../../model/customer.model';
import * as secp from '@noble/secp256k1';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent extends BaseList<Customer> {
  serverPublicKey = '';
  constructor(injector: Injector, protected override service: CustomerService) {
    super(injector, service);
  }

  override list() {
    this.test();
  }
  test() {
    (async () => {
      // keys, messages & other inputs can be Uint8Arrays or hex strings
      // Uint8Array.from([0xde, 0xad, 0xbe, 0xef]) === 'deadbeef'
      const privateKey = secp.utils.randomPrivateKey(); // Secure random private key
      console.log(`privateKey ${privateKey}`);
      // sha256 of 'hello world'
      // const msgHash = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
      const publicKey = secp.getPublicKey(privateKey, false); // Make pubkey from the private key
      // const signature = await secp.signAsync(msgHash, privateKey); // sign
      // const isValid = secp.verify(signature, msgHash, publicKey); // verify

      const pKey = this.toHexString(publicKey).slice(2);
      console.log(`pKey ${pKey}`);
      this.service.exchangeKey(pKey).subscribe((res: any) => {
        console.log(`res.data.rspTempPublicKey ${res.data.rspTempPublicKey}`);
        const respData = this.hex2ByteArr(res.data.rspTempPublicKey);
        console.log(`respData ${respData}`);
        const share1 = secp.getSharedSecret(
          privateKey,
          '04' + res.data.rspTempPublicKey
        );
        console.log(`share1 ${share1}`);
        console.log(`share1 ${this.toHexString(share1)}`);
      });

      // const privateKey2 = secp.utils.randomPrivateKey();
      // const publicKey2 = secp.getPublicKey(privateKey2); // Key of user 2
      // const share1 = secp.getSharedSecret(localStorage.getItem('pk'),
      // '0417ed403576abe85b48d7a1e7e1a36ca73aaade8fb7d8f850d6eda7d234354bbfb078a2
      // c8cf89d724bae5c323e425fe2cdd3b46c05900c8c7713dbb6c81a95659'); // Elliptic curve diffie-hellman
      // const share2 = secp.getSharedSecret(privateKey2, publicKey); // Elliptic curve diffie-hellman
      // console.log(share1.toString() === share2.toString());
      // // const rec = signature.recoverPublicKey(msgHash); // Public key recovery
      // // console.log(`recov ${rec.pu}`);
      // // console.log(`isValid: ${isValid}`);
      // console.log(`private_key: ${privateKey}`);
      // // const hex = Buffer.from(publicKey).toString('hex');
      // console.log(`our_public_key: ${this.toHexString(publicKey)}`);
      // console.log(`other_private_key: ${privateKey2}`);
      // console.log(`other_public_key: ${publicKey2}`);
      // console.log(`share sec: ${this.toHexString(share1)}`);
      // console.log(`share sec: ${this.toHexString(share2)}`);
    })();
  }
  toHexString(byteArray: Uint8Array) {
    return Array.from(byteArray, (byte) => {
      // tslint:disable-next-line:no-bitwise
      // @ts-ignore
      // tslint:disable-next-line:no-bitwise
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('');
  }
  i2hex(i: number) {
    return ('0' + i.toString(16)).slice(-2);
  }
  iArr2Hex(uint8Arr: Uint8Array) {
    Array.from(uint8Arr).map(this.i2hex).join('');
  }
  hex2ByteArr(hexString: string) {
    return Uint8Array.from(
      hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
  }
}
