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
            hr: {
              borderColor: 'hsl(var(--border))',
              marginTop: '3em',
              marginBottom: '3em',
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'hsl(var(--foreground))',
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h1: {
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
            },
            h2: {
              fontSize: '2rem',
              marginBottom: '1.25rem',
              lineHeight: '1.3',
            },
            h3: {
              fontSize: '1.75rem',
              marginBottom: '1rem',
              lineHeight: '1.4',
            },
            'p, ul, ol': {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              },
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary))',
              borderLeftWidth: '2px',
              fontStyle: 'italic',
              color: 'hsl(var(--muted-foreground))',
              marginTop: '2em',
              marginBottom: '2em',
              paddingLeft: '1.5em',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.75em',
              '&::before': {
                content: '""',
                width: '0.375em',
                height: '0.375em',
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--muted-foreground))',
                position: 'absolute',
                left: '0.5em',
                top: '0.6875em',
              },
            },
            'ol > li': {
              paddingLeft: '0.5em',
            },
            code: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.5rem',
              padding: '1em 1.5em',
              overflow: 'auto',
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '2em',
              marginBottom: '2em',
              maxHeight: '32rem',
              height: 'auto',
              // margin: '0 auto',
              objectFit: 'cover',
              objectPosition: 'center',
            },
            figure: {
              marginTop: '2em',
              marginBottom: '2em',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '32rem',
              },
              '& figcaption': {
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.875em',
                marginTop: '0.75em',
                textAlign: 'center',
              },
            },
            table: {
              width: '100%',
              tableLayout: 'fixed',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em',
              borderCollapse: 'collapse',
            },
            'th, td': {
              padding: '0.75em',
              borderBottom: '1px solid hsl(var(--border))',
            },
            th: {
              backgroundColor: 'hsl(var(--muted))',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
