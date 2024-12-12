import * as React from 'react';

interface VerifyEmailProps {
  confirmLink: string;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ confirmLink }) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#1f2937', marginBottom: '20px' }}>
          Verify your email address
        </h1>
        <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '24px' }}>
          Please click the button below to verify your email address:
        </p>
        <a
          href={confirmLink}
          style={{
            display: 'inline-block',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            margin: '20px 0',
          }}
        >
          Verify Email
        </a>
        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '20px' }}>
          If you didn't request this email, you can safely ignore it.
        </p>
        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '20px' }}>
          If the button doesn't work, copy and paste this link into your
          browser:
        </p>
        <p
          style={{ color: '#2563eb', fontSize: '14px', wordBreak: 'break-all' }}
        >
          {confirmLink}
        </p>
      </div>
    </div>
  );
};
