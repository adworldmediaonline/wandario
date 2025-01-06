import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        default: '1100px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            width: '100%',
            color: 'hsl(var(--foreground) / 0.8)',
            fontSize: '1rem',
            lineHeight: '1.75',
            '> *': {
              width: '100%',
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'hsl(var(--foreground) / 0.9)',
              fontWeight: '600',
              letterSpacing: '-0.02em',
              'scroll-margin-top': '6rem',
              width: '100%',
            },
            h1: {
              fontSize: '2rem',
              lineHeight: '1.2',
              marginBottom: '1.25rem',
            },
            h2: {
              fontSize: '1.5rem',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.25rem',
              lineHeight: '1.4',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            'p, ul, ol': {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
              lineHeight: '1.75',
            },
            'p:first-of-type': {
              fontSize: '1.125rem',
              color: 'hsl(var(--foreground) / 0.9)',
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'hsl(var(--primary) / 0.8)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              },
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary) / 0.2)',
              borderLeftWidth: '2px',
              fontStyle: 'italic',
              color: 'hsl(var(--muted-foreground))',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              paddingLeft: '1rem',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.5rem',
              marginBottom: '0.5rem',
              '&::before': {
                content: '""',
                width: '0.35rem',
                height: '0.35rem',
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--primary) / 0.5)',
                position: 'absolute',
                left: '0.375rem',
                top: '0.6875rem',
              },
            },
            'ol > li': {
              paddingLeft: '0.5rem',
              marginBottom: '0.5rem',
            },
            code: {
              color: 'hsl(var(--primary) / 0.9)',
              backgroundColor: 'hsl(var(--muted) / 0.3)',
              borderRadius: '0.25rem',
              padding: '0.15rem 0.3rem',
              fontSize: '0.875em',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted) / 0.3)',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
              border: '1px solid hsl(var(--border) / 0.4)',
              code: {
                backgroundColor: 'transparent',
                padding: 0,
                borderRadius: 0,
                border: 'none',
              },
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              maxHeight: '28rem',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'center',
              boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              },
            },
            figure: {
              marginTop: '2rem',
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '28rem',
                marginTop: 0,
                marginBottom: 0,
              },
              '& figcaption': {
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.875em',
                textAlign: 'center',
                fontStyle: 'italic',
                maxWidth: '60ch',
              },
            },
            table: {
              width: '100%',
              fontSize: '0.875em',
              lineHeight: '1.5',
              borderCollapse: 'separate',
              borderSpacing: 0,
              borderRadius: '0.5rem',
              overflow: 'hidden',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              border: '1px solid hsl(var(--border) / 0.3)',
            },
            'th, td': {
              padding: '0.75rem 1rem',
              borderBottom: '1px solid hsl(var(--border) / 0.3)',
              borderRight: '1px solid hsl(var(--border) / 0.3)',
              '&:last-child': {
                borderRight: 'none',
              },
            },
            th: {
              backgroundColor: 'hsl(var(--muted) / 0.3)',
              fontWeight: '600',
              fontSize: '0.75em',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'hsl(var(--foreground) / 0.7)',
            },
          },
        },
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
