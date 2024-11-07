export default class Utils {
  public static maskPhone(value: string) {
    if (value.length === 11) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    return value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
  }

  public static formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  public static formatCurrencyMask = (value: string | number) => {
    let numberValue = parseFloat(String(value).replace(/[^0-9]/g, ''));
    if (isNaN(numberValue)) numberValue = 0;
    return (numberValue / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  public static formatDate(date: any) {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  public static maskDocument(value: string) {
    const document = value.replace(/\D/g, '');

    return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  public static maskCpfDocument(value: string) {
    const document = value.replace(/\D/g, '');

    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  public static firstLetterUppercase(value?: string) {
    if (!value) return '';
    const words = value.split(' ');
    const formatWord = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return formatWord.join(' ');
  }

  public static validateCompanyRegistrationNumber = (
    companyRegistrationNumber: string,
  ): boolean => {
    companyRegistrationNumber = companyRegistrationNumber.replace(/[^\d]+/g, '');

    if (companyRegistrationNumber.length !== 14) return false;

    const calculateDigit = (companyRegistrationNumber: string, weights: number[]): number => {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(companyRegistrationNumber[i]) * weights[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const firstDigit = calculateDigit(companyRegistrationNumber, firstWeights);
    const secondDigit = calculateDigit(companyRegistrationNumber, secondWeights);

    return (
      firstDigit === parseInt(companyRegistrationNumber[12]) &&
      secondDigit === parseInt(companyRegistrationNumber[13])
    );
  };

  public static isValidCPF = (cpf: string) => {
    const replacedCpf = cpf.replace(/\D/g, '');
    const invalids = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ];

    if (replacedCpf.length !== 11) return false;
    if (invalids.includes(replacedCpf)) return false;

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) sum += parseInt(replacedCpf.substring(i - 1, i)) * i;
    rest = sum % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(replacedCpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(replacedCpf.substring(i - 1, i)) * (i - 1);
    rest = sum % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(replacedCpf.substring(10, 11))) return false;

    return true;
  };
}
