
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LanguageToggle = () => {
  const [language, setLanguage] = useState<'ne' | 'en'>('ne');

  const toggleLanguage = () => {
    setLanguage(language === 'ne' ? 'en' : 'ne');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <span className="text-xs">
        {language === 'ne' ? 'नेपाली' : 'English'}
      </span>
      <Badge variant="secondary" className="text-xs">
        {language === 'ne' ? 'EN' : 'ने'}
      </Badge>
    </Button>
  );
};

export default LanguageToggle;
