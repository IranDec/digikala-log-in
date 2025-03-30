import { useState } from 'react';
import './FormStyles.css';
import OtpVerification from './OtpVerification';

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validatePhoneNumber = (number: string) => {
    // Basic Iranian phone number validation (starts with 09 and has 11 digits)
    const regex = /^09\d{9}$/;
    return regex.test(number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneNumber.trim()) {
      setError('لطفا شماره موبایل خود را وارد کنید');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('شماره موبایل نامعتبر است');
      return;
    }

    // Simulate API call to send OTP
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowOtp(true);
    }, 1000);
  };

  const handleBack = () => {
    setShowOtp(false);
  };

  const handleVerify = () => {
    // This would typically navigate to the user's dashboard or relevant page
    alert('Login successful!');
  };

  return (
    <div className="lg:border lg:border-neutral-200 rounded-medium p-5 lg:p-8 flex flex-col items-center justify-start lg:justify-center w-full max-w-md bg-white">
      <div className="w-full relative flex items-center justify-center mb-3">
        <a href="/" className="transform transition-all duration-500 ease-out" style={{ width: '100px', lineHeight: 0 }}>
          <img
            className="w-full inline-block"
            src="/images/digikala-logo.svg"
            width="100"
            alt="لوگوی دیجیکالا"
            style={{ objectFit: 'contain' }}
          />
        </a>
      </div>

      <div className="w-full">
        {!showOtp ? (
          <>
            <h1 className="text-h4 text-neutral-900 text-right w-full mt-4">
              ورود | ثبت‌نام
            </h1>
            <p className="text-body-2 text-neutral-700 mt-4 text-right w-full">
              سلام!
            </p>
            <p className="text-body-2 text-neutral-700 mb-4 text-right w-full">
              لطفا شماره موبایل یا ایمیل خود را وارد کنید
            </p>

            <form onSubmit={handleSubmit}>
              <div className="FormComponentFrame_FormComponentFrame__PIUpy w-full FormComponentFrame_FormComponentFrame--normal__TQSOm">
                <div className="px-2 flex items-center Input_InputWrapper--focus__D1FvE relative text-neutral-700 bg-neutral-100 lg:bg-neutral-0 Input_InputWrapper__d_4kf rounded-medium">
                  <div className="grow text-body-3">
                    <input
                      className="px-2 text-subtitle w-full py-5 lg:py-2 text-left"
                      type="tel"
                      name="phoneNumber"
                      placeholder="09194047212"
                      inputMode="numeric"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              {error && <p className="text-sm text-primary mt-2 text-right">{error}</p>}

              <button
                className={`relative flex items-center user-select-none text-button-1 rounded-medium w-full mt-6 lg:mt-8 text-white bg-primary py-3 ${isLoading ? 'opacity-70' : ''}`}
                type="submit"
                disabled={isLoading}
              >
                <div className="flex items-center justify-center relative grow">
                  {isLoading ? 'در حال پردازش...' : 'ورود'}
                </div>
              </button>
            </form>
          </>
        ) : (
          <OtpVerification
            phoneNumber={phoneNumber}
            onBack={handleBack}
            onVerify={handleVerify}
          />
        )}

        {!showOtp && (
          <p className="text-caption text-neutral-700 mt-4 text-center">
            ورود شما به معنای پذیرش
            <a className="mx-1 inline-block text-secondary-700" href="#">
              شرایط دیجی‌کالا
            </a>
            و
            <a className="mx-1 inline-block text-secondary-700" href="#">
              قوانین حریم‌خصوصی
            </a>
            است
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
