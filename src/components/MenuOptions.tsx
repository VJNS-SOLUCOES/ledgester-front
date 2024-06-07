import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FunctionChildrenDto } from '../types/menuDto';
import { handleIcons } from '../utils';
import { useState } from 'react';

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

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const navigate = useNavigate();

  return (
    <Accordion
      expanded={!expandedMenu ? expanded === description && mouseEnter : expanded === description}
      onChange={handleChange(description)}
      sx={{
        '&.MuiAccordion-root': {
          boxShadow: `none !important`,
        },
        '&.MuiAccordion-root::before': {
          display: `none !important`,
        },
        '&.MuiAccordion-root.Mui-expanded': {
          margin: '0',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="white" />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          '&.MuiAccordionSummary-root': {
            backgroundColor: `#0d245e !important`,
            padding: '0px 9px',
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '12px 0',
          },
          '&.MuiAccordionSummary-root.Mui-expanded': {
            minHeight: '48px',
          },
        }}
      >
        <div className="pl-1 flex items-center gap-4">
          {handleIcons(menuIcon)}
          <Typography className="text-white">{description}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          '&.MuiAccordionDetails-root': {
            backgroundColor: 'rgba(13,36,94,0.95)',
            padding: '10px 0px',
          },
        }}
      >
        {childrens.map(element => {
          return (
            <div className="flex items-center">
              <button className="cursor-pointer w-full" onClick={() => navigate(element.rotaFront)}>
                <div
                  className={`pl-16 active:animate-click hover:bg-black/30 ${
                    element.rotaFront === pathname && mouseEnter && 'bg-black/30'
                  } flex items-center gap-5`}
                >
                  <Typography className="text-white py-1 text-start" fontSize={14}>
                    {element.desc_Funcao}
                  </Typography>
                </div>
              </button>
            </div>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
