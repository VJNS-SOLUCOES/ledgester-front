import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FunctionChildrenDto } from '../types/menuDto';
import { handleIcons } from '../utils';
import { useState } from 'react';
import { SubMenuOption } from './SubMenuOption';
import { sideBarTheme } from '../styles/sideBarTheme';

type Props = {
  expandedMenu: boolean;
  menuIcon: string;
  description: string;
  mouseEnter: boolean;
  childrens: FunctionChildrenDto[];
};

export const MenuOptions: React.FC<Props> = ({
  menuIcon,
  description,
  mouseEnter,
  childrens,
  expandedMenu,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const { pathname } = useLocation();

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ThemeProvider theme={sideBarTheme}>
      <Accordion
        expanded={!expandedMenu ? expanded === description && mouseEnter : expanded === description}
        onChange={handleChange(description)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="pl-1 flex items-center gap-4">
            {handleIcons(menuIcon)}
            <Typography className="text-white">{description}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {childrens.map(element => {
            return (
              <SubMenuOption
                key={element.funcaoId}
                functionsOptions={element}
                pathname={pathname}
                mouseEnter={mouseEnter}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
  );
};
