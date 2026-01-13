import type { TypographyVariant } from '@/components/ui/Typography/types';
import clsx from 'clsx';
import { Typography } from '@/components/ui/Typography';
import { ComponentSection } from './components/ComponentSection';
import s from './style.module.css';

const TYPOGRAPHY_VARIANTS: TypographyVariant[] = [
    'heading-h1',
    'heading-h2',
    'heading-h3',
    'heading-h4',
    'heading-h5',
    'body-m',
    'body-s',
    'body-caption',
    'button-big',
    'button-medium',
    'button-small',
];

const UiKit: React.FC = () => {
    return (
        <main className={clsx(s.wrap, 'full-height')}>
            <div className={s.inner}>
                <header className={s.header}>
                    <Typography variant="heading-h1" render={<h1 />}>
                        UI Kit
                    </Typography>
                    <Typography variant="body-m" className={s.description}>
                        A comprehensive showcase of all typography variants available in the design system.
                    </Typography>
                </header>
                <section className={s.content}>
                    <ComponentSection title="Typography">
                        {TYPOGRAPHY_VARIANTS.map((variant) => {
                            return (
                                <div key={variant} className={s['variant-container']}>
                                    <Typography variant="body-s" className={s['variant-title']}>
                                        {variant}
                                    </Typography>
                                    <div className={s['variant-content']}>
                                        <Typography variant={variant}>
                                            The quick brown fox jumps over the lazy dog
                                        </Typography>
                                        <Typography variant={variant}>1234567890</Typography>
                                        <Typography variant={variant} render={<strong />}>
                                            Bold text example
                                        </Typography>
                                        <Typography variant={variant}>Regular text example</Typography>
                                    </div>
                                </div>
                            );
                        })}
                    </ComponentSection>
                </section>
            </div>
        </main>
    );
};

export default UiKit;
