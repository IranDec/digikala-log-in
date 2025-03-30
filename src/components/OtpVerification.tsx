import { useState, useEffect, useRef } from 'react';
import './FormStyles.css';

interface OtpVerificationProps {
  phoneNumber: string;
  onBack: () => void;
  onVerify: () => void;
}

const OtpVerification = ({ phoneNumber, onBack, onVerify }: OtpVerificationProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Set up the countdown timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste event
      const pastedValue = value.substring(0, 5);
      const newOtp = [...otp];

      for (let i = 0; i < pastedValue.length && i < 5; i++) {
        if (/^\d+$/.test(pastedValue[i])) {
          newOtp[i] = pastedValue[i];
        }
      }

      setOtp(newOtp);

      // Focus on the last filled input or the next empty input
      const lastFilledIndex = newOtp.findIndex(val => val === '') - 1;
      const focusIndex = lastFilledIndex >= 0 ?
        Math.min(lastFilledIndex, 4) :
        Math.min(pastedValue.length, 4);

      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
    } else if (/^\d?$/.test(value)) {
      // Handle single digit input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input if current one is filled
      if (value !== '' && index < 4) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every(digit => digit !== '')) {
      onVerify();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleResendCode = () => {
    // Reset the OTP fields
    setOtp(['', '', '', '', '']);
    // Reset the timer
    setTimer(120);
    // Focus the first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="text-neutral-700 p-2"
          aria-label="بازگشت"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-h4 text-neutral-900 flex-1 text-right">
          کد تایید را وارد کنید
        </h1>
      </div>

      <p className="text-body-2 text-neutral-700 mt-2 text-right w-full">
        کد تایید برای شماره <span className="text-neutral-900">{phoneNumber}</span> ارسال شد
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex justify-between gap-2 mb-6 direction-ltr">
          {otp.map((digit, index) => (
            <div key={index} className="flex-1">
              <input
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={5}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full h-12 text-center border border-neutral-200 rounded-medium bg-neutral-50 focus:border-primary focus:ring-1 focus:ring-primary text-lg font-bold"
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={timer > 0}
            className={`text-sm ${timer > 0 ? 'text-neutral-400' : 'text-primary'}`}
          >
            ارسال مجدد کد
          </button>
          <span className="text-sm text-neutral-700">
            {formatTime(timer)}
          </span>
        </div>

        <button
          className="relative flex items-center user-select-none text-button-1 rounded-medium w-full mt-4 text-white bg-primary py-3"
          type="submit"
          disabled={!otp.every(digit => digit !== '')}
        >
          <div className="flex items-center justify-center relative grow">
            تایید
          </div>
        </button>
      </form>

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
    </div>
  );
};

export default OtpVerification;
