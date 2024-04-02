import { Fyo } from 'fyo';
import { Action, ListViewSettings } from 'fyo/model/types';
import { LedgerPosting } from 'models/Transactional/LedgerPosting';
import { ModelNameEnum } from 'models/types';
import { getInvoiceActions, getTransactionStatusColumn } from '../../helpers';
import { Invoice } from '../Invoice/Invoice';
import { Invoice as zatcaInvoice } from '@axenda/zatca';
import { SalesInvoiceItem } from '../SalesInvoiceItem/SalesInvoiceItem';

export class SalesInvoice extends Invoice {
  items?: SalesInvoiceItem[];

  async getPosting() {
    const exchangeRate = this.exchangeRate ?? 1;
    const posting: LedgerPosting = new LedgerPosting(this, this.fyo);
    if (this.isReturn) {
      await posting.credit(this.account!, this.baseGrandTotal!);
    } else {
      await posting.debit(this.account!, this.baseGrandTotal!);
    }

    for (const item of this.items!) {
      if (this.isReturn) {
        await posting.debit(item.account!, item.amount!.mul(exchangeRate));
        continue;
      }
      await posting.credit(item.account!, item.amount!.mul(exchangeRate));
    }

    if (this.taxes) {
      for (const tax of this.taxes) {
        if (this.isReturn) {
          await posting.debit(tax.account!, tax.amount!.mul(exchangeRate));
          continue;
        }
        await posting.credit(tax.account!, tax.amount!.mul(exchangeRate));
      }
    }

    const discountAmount = this.getTotalDiscount();
    const discountAccount = this.fyo.singles.AccountingSettings
      ?.discountAccount as string | undefined;
    if (discountAccount && discountAmount.isPositive()) {
      if (this.isReturn) {
        await posting.credit(discountAccount, discountAmount.mul(exchangeRate));
      } else {
        await posting.debit(discountAccount, discountAmount.mul(exchangeRate));
      }
    }
    if(this.submitted && (!this.zatca_tlv || !this.zatca_qr)) {
      const acc = await this.fyo.doc.getDoc(ModelNameEnum.AccountingSettings);
      let vatTotal = 0;
      const taxes = await this.getTaxSummary();
      taxes.forEach(i => {
        if (i.account == acc.vat_account) {
          vatTotal += i.amount.float;
        }
      })
      const invoiceZatca = new zatcaInvoice({
        sellerName: `${acc.companyName}`,
        invoiceTimestamp: `${this.date}`,
        invoiceTotal: `${this.grandTotal?.float}`,
        invoiceVatTotal: `${vatTotal}`,
        vatRegistrationNumber: `${acc.vat_number}`
      })
      this.zatca_tlv = invoiceZatca.toBase64();
      this.zatca_qr = await invoiceZatca.render();
    }
    
    await posting.makeRoundOffEntry();
    return posting;
  }

  static getListViewSettings(): ListViewSettings {
    return {
      columns: [
        'name',
        getTransactionStatusColumn(),
        'party',
        'date',
        'baseGrandTotal',
        'outstandingAmount',
      ],
    };
  }

  static getActions(fyo: Fyo): Action[] {
    return getInvoiceActions(fyo, ModelNameEnum.SalesInvoice);
  }
}
