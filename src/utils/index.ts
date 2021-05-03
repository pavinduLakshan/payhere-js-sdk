import { RecurringTimeUnit, Week, Month, Year } from './RecurringTimeUnit';
import { Customer } from './Customer';
import { Payhere } from '../Payhere';

const removeBlankAttributes = (obj: object): object => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};
// +
const submitPayhereClientRequest = (
  reqObject: { [x: string]: any },
  requiredParams: any,
  endpoint: string,
  onError: (err: string) => void,
) => {
  if (!Payhere.merchantId) {
    onError('Payhere is not initialized');
    return;
  }
  const form = window.document.createElement('form');
  form.setAttribute('action', Payhere.baseUrl + endpoint);
  form.style.display = 'none';
  form.setAttribute('method', 'post');

  for (const name of Object.keys(reqObject)) {
    if (reqObject[name]) {
      const inpt = window.document.createElement('input');
      inpt.setAttribute('name', name);
      inpt.setAttribute('type', 'hidden');
      inpt.setAttribute('value', reqObject[name]);
      form.appendChild(inpt);
    } else {
      if (Object.keys(requiredParams).includes(name)) {
        onError(`Payhere Error: ${requiredParams[name]} is a required parameter`);
        return;
      }
    }
  }

  window.document.body.appendChild(form);
  form.submit();
};

export { submitPayhereClientRequest, removeBlankAttributes, Week, Month, Year, RecurringTimeUnit, Customer };
