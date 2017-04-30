package io.javademo.examples.jpa.model;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;


import javax.ejb.Stateless;
import javax.inject.Inject;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.ZoneId;

import java.util.GregorianCalendar;
import java.util.LinkedHashSet;
import java.util.List;

/**
 * Created by marcomolteni on 30.04.17.
 */

@Stateless
public class ConferenceExcelService {

    private static final Integer POI_CHAR_SIZE = 256;
    private static final Integer MAX_COLUMN_CHAR = 40;

    @Inject
    ConferenceService conferenceService;

    public ByteArrayOutputStream getListAsExcel() throws IOException {

        List<Conference> conferenceList = conferenceService.getNextConferenceList();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Workbook workbook = createExcelSheet(conferenceList);

        workbook.write(outputStream);

        return outputStream;
    }

    private Workbook createExcelSheet(List<Conference> conferenceList) {

        Integer rowCounter = 0;
        Integer cellCounter = 0;

        Workbook workbook = new HSSFWorkbook();
        CellStyle cellStyle = getCellStyle(workbook);
        Sheet sheet = workbook.createSheet();

        Row row = sheet.createRow(rowCounter++);

        LinkedHashSet<String> columns = new LinkedHashSet<>();
        columns.add("Name");
        columns.add("From");
        columns.add("To");
        columns.add("City");
        columns.add("Country");
        columns.add("Website");
        columns.add("CFP");

        for (String columnName : columns) {
            Cell cell = row.createCell(cellCounter++);
            cell.setCellStyle(cellStyle);
            cell.setCellValue(columnName);
        }

        for (Conference conference : conferenceList) {
            row = sheet.createRow(rowCounter++);
            cellCounter = 0;

            row.createCell(cellCounter++).setCellValue(conference.getName());

            Cell dateFromCell = row.createCell(cellCounter++);
            dateFromCell.setCellValue(GregorianCalendar.from((conference.getBegin().atStartOfDay(ZoneId.systemDefault()))));
            dateFromCell.setCellStyle(getDateStyle(workbook));

            Cell dateToCell = row.createCell(cellCounter++);
            dateToCell.setCellValue(GregorianCalendar.from((conference.getEnd().atStartOfDay(ZoneId.systemDefault()))));
            dateToCell.setCellStyle(getDateStyle(workbook));

            row.createCell(cellCounter++).setCellValue(conference.getCity());
            row.createCell(cellCounter++).setCellValue(conference.getCountry());
            row.createCell(cellCounter++).setCellValue(conference.getWebsite());

            if (conference.getCfp() != null) {

                Cell dateCfp = row.createCell(cellCounter++);
                dateCfp.setCellValue(GregorianCalendar.from((conference.getCfp().atStartOfDay(ZoneId.systemDefault()))));
                dateCfp.setCellStyle(getDateStyle(workbook));

            } else {
                row.createCell(cellCounter++).setCellValue("");
            }

        }

        formatLayout(sheet, columns.size());
        return workbook;
    }

    private CellStyle getCellStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setItalic(true);
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFont(font);
        return cellStyle;
    }

    private CellStyle getDateStyle (Workbook workbook) {
        CellStyle cellStyle = workbook.createCellStyle();

        CreationHelper createHelper = workbook.getCreationHelper();
        cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("m/d/yy"));

        return cellStyle;
    }

    private void formatLayout(Sheet sheet, Integer totalColumns) {
        for (int i = 0; i < totalColumns; i++) {
            sheet.autoSizeColumn(i);
            if (sheet.getColumnWidth(i) > POI_CHAR_SIZE*MAX_COLUMN_CHAR) {
                sheet.setColumnWidth(i, POI_CHAR_SIZE*MAX_COLUMN_CHAR);
            }
        }

        sheet.createFreezePane(1,1);
    }

}
