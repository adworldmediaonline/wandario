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
            color: 'hsl(var(--foreground))',
            lineHeight: '1.7',
            fontSize: '1.125rem',
            hr: {
              borderColor: 'hsl(var(--border))',
              marginTop: '2.5em',
              marginBottom: '2.5em',
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
              letterSpacing: '-0.02em',
              'scroll-margin-top': '6rem',
            },
            h1: {
              fontSize: '2.25rem',
              lineHeight: '1.3',
              marginBottom: '1.5rem',
              marginTop: '2.5rem',
            },
            h2: {
              fontSize: '1.875rem',
              lineHeight: '1.4',
              marginBottom: '1.25rem',
              marginTop: '2.25rem',
            },
            h3: {
              fontSize: '1.5rem',
              lineHeight: '1.5',
              marginBottom: '1rem',
              marginTop: '2rem',
            },
            'p, ul, ol': {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              lineHeight: '1.75',
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s ease-in-out',
              '&:hover': {
                color: 'hsl(var(--primary))',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              },
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary))',
              borderLeftWidth: '3px',
              fontStyle: 'italic',
              color: 'hsl(var(--muted-foreground))',
              marginTop: '2em',
              marginBottom: '2em',
              paddingLeft: '1.5em',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              '& p:first-of-type::before': {
                content: 'open-quote',
              },
              '& p:last-of-type::after': {
                content: 'close-quote',
              },
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.75em',
              marginBottom: '0.5em',
              '&::before': {
                content: '""',
                width: '0.375em',
                height: '0.375em',
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--primary))',
                position: 'absolute',
                left: '0.5em',
                top: '0.6875em',
                opacity: 0.7,
              },
            },
            'ol > li': {
              paddingLeft: '0.5em',
              marginBottom: '0.5em',
            },
            code: {
              color: 'hsl(var(--primary))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
              fontSize: '0.875em',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.75rem',
              padding: '1.25em 1.5em',
              overflow: 'auto',
              border: '1px solid hsl(var(--border))',
            },
            img: {
              borderRadius: '0.75rem',
              marginTop: '2em',
              marginBottom: '2em',
              maxHeight: '32rem',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'center',
              boxShadow:
                '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
            figure: {
              marginTop: '2.5em',
              marginBottom: '2.5em',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '32rem',
                marginTop: 0,
                marginBottom: 0,
              },
              '& figcaption': {
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.875em',
                textAlign: 'center',
                fontStyle: 'italic',
              },
            },
            table: {
              width: '100%',
              tableLayout: 'fixed',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em',
              borderCollapse: 'separate',
              borderSpacing: 0,
              borderRadius: '0.5rem',
              overflow: 'hidden',
              border: '1px solid hsl(var(--border))',
            },
            'th, td': {
              padding: '0.75em 1em',
              borderBottom: '1px solid hsl(var(--border))',
              borderRight: '1px solid hsl(var(--border))',
              '&:last-child': {
                borderRight: 'none',
              },
            },
            th: {
              backgroundColor: 'hsl(var(--muted))',
              fontWeight: '600',
              fontSize: '0.875em',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
          },
        },
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
