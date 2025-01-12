import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function ContactEmail({
  name,
  email,
  phone,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <div>
      <h1 style={styles.heading}>New Contact Form Submission</h1>
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.subHeading}>Contact Details</h2>
          <div style={styles.field}>
            <strong style={styles.label}>Name:</strong>
            <span style={styles.value}>{name}</span>
          </div>
          <div style={styles.field}>
            <strong style={styles.label}>Email:</strong>
            <span style={styles.value}>{email}</span>
          </div>
          <div style={styles.field}>
            <strong style={styles.label}>Phone:</strong>
            <span style={styles.value}>{phone}</span>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeading}>Message</h2>
          <div style={styles.field}>
            <strong style={styles.label}>Subject:</strong>
            <span style={styles.value}>{subject}</span>
          </div>
          <div style={styles.messageBox}>
            <p style={styles.message}>{message}</p>
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            This email was sent from the contact form on Wandario.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  heading: {
    color: '#1a365d',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 24px',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  section: {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
  },
  subHeading: {
    color: '#2d3748',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  field: {
    marginBottom: '12px',
  },
  label: {
    color: '#4a5568',
    marginRight: '8px',
    fontSize: '14px',
  },
  value: {
    color: '#1a202c',
    fontSize: '14px',
  },
  messageBox: {
    backgroundColor: '#ffffff',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #e2e8f0',
  },
  message: {
    color: '#2d3748',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
  },
  footer: {
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: '1px solid #e2e8f0',
  },
  footerText: {
    color: '#718096',
    fontSize: '12px',
    textAlign: 'center' as const,
    margin: '0',
  },
};
