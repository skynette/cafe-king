import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ColorInfo {
    name: string;
    class: string;
}

interface ColorButtonProps {
    colorName: string;
    colorClass: string;
}

const ColorButton: React.FC<ColorButtonProps> = ({ colorName, colorClass }) => (
    <Button
        className={`border ${colorClass} ${colorName.includes('foreground') ? 'text-background' : 'text-foreground'
            }`}
    >
        {colorName}
    </Button>
);

const ColorPaletteDisplay: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const colorVariables: ColorInfo[] = [
        { name: 'background', class: 'bg-background' },
        { name: 'foreground', class: 'bg-foreground' },
        { name: 'card', class: 'bg-card' },
        { name: 'card-foreground', class: 'bg-card-foreground' },
        { name: 'popover', class: 'bg-popover' },
        { name: 'popover-foreground', class: 'bg-popover-foreground' },
        { name: 'primary', class: 'bg-primary' },
        { name: 'primary-foreground', class: 'bg-primary-foreground' },
        { name: 'secondary', class: 'bg-secondary' },
        { name: 'secondary-foreground', class: 'bg-secondary-foreground' },
        { name: 'muted', class: 'bg-muted' },
        { name: 'muted-foreground', class: 'bg-muted-foreground' },
        { name: 'accent', class: 'bg-accent' },
        { name: 'accent-foreground', class: 'bg-accent-foreground' },
        { name: 'destructive', class: 'bg-destructive' },
        { name: 'destructive-foreground', class: 'bg-destructive-foreground' },
        { name: 'border', class: 'bg-border' },
        { name: 'input', class: 'bg-input' },
        { name: 'ring', class: 'bg-ring' },
    ];

    const chartColors: ColorInfo[] = [
        { name: 'chart-1', class: 'bg-[hsl(var(--chart-1))]' },
        { name: 'chart-2', class: 'bg-[hsl(var(--chart-2))]' },
        { name: 'chart-3', class: 'bg-[hsl(var(--chart-3))]' },
        { name: 'chart-4', class: 'bg-[hsl(var(--chart-4))]' },
        { name: 'chart-5', class: 'bg-[hsl(var(--chart-5))]' },
    ];

    return (
        <div className={`p-4 ${isDarkMode ? 'dark' : ''}`}>
            <div className="flex items-center space-x-2 mb-4">
                <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {colorVariables.map((color) => (
                    <ColorButton key={color.name} colorName={color.name} colorClass={color.class} />
                ))}
            </div>
            <h2 className="mt-6 mb-2 text-lg font-semibold">Chart Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {chartColors.map((color) => (
                    <ColorButton key={color.name} colorName={color.name} colorClass={color.class} />
                ))}
            </div>
        </div>
    );
};

export default ColorPaletteDisplay;