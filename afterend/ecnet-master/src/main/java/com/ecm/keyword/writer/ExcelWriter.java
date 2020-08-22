package com.ecm.keyword.writer;

import com.ecm.keyword.model.EvidenceModel;
import com.ecm.keyword.model.FactModel;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

public class ExcelWriter {

    public void writeExcel(String fileName, ArrayList<FactModel> fList){
        //����HSSFWorkbook����
        HSSFWorkbook wb = new HSSFWorkbook();

        writeEvi(wb, fList);
        writeFact(wb, fList);

        //���Excel�ļ�
        FileOutputStream output;
        try {
            output = new FileOutputStream("/Users/dongyixuan/workspace/֤����/newresult/"+fileName+".xls");
            wb.write(output);
            output.flush();

            wb.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void writeExcel4W1H(String fileName, ArrayList<EvidenceModel> ceList){
        //����HSSFWorkbook����
        HSSFWorkbook wb = new HSSFWorkbook();

        //����HSSFSheet����
        HSSFSheet sheet = wb.createSheet("�ؼ�Ҫ���嵥");

        //��д��ͷ
        CellRangeAddress cra = new CellRangeAddress(0, 0, 0, 8);
        sheet.addMergedRegion(cra);
        HSSFRow titleRow = sheet.createRow(0);
        HSSFCell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("4W1H");

        HSSFRow headRow = sheet.createRow(1);
        HSSFCell titleCell1 = headRow.createCell(0);
        titleCell1.setCellValue("���");
        HSSFCell titleCell2 = headRow.createCell(1);
        titleCell2.setCellValue("֤����ϸ");
        HSSFCell titleCell3 = headRow.createCell(2);
        titleCell3.setCellValue("�ؼ�Ҫ��");
        HSSFCell titleCell4 = headRow.createCell(3);
        titleCell4.setCellValue("�ؼ�Ҫ������");

        //��д����
        int rowIndex = 2;
        int eviId = 1;


        for(EvidenceModel evi : ceList){
            HashMap<String, List<String>> map = evi.getKeyWordMap();
            Set<String> keys = map.keySet();
            java.util.Iterator<String> keyIte = keys.iterator();

            int beginRowIndex = rowIndex;
            HSSFRow row = sheet.createRow(rowIndex);

            while(keyIte.hasNext()){
                String type = keyIte.next();
                List<String> eles = map.get(type);
                for(String ele : eles){
                    HSSFCell headCell2 = row.createCell(2);
                    headCell2.setCellValue(ele);
                    HSSFCell headCell3 = row.createCell(3);
                    headCell3.setCellValue(type);
                    row = sheet.createRow(++rowIndex);
                }
            }
            --rowIndex;

            if(rowIndex > beginRowIndex){
                CellRangeAddress idCra = new CellRangeAddress(beginRowIndex, rowIndex, 0, 0);
                CellRangeAddress nameCra = new CellRangeAddress(beginRowIndex, rowIndex, 1, 1);
                sheet.addMergedRegion(idCra);
                sheet.addMergedRegion(nameCra);
            }
            row = sheet.getRow(beginRowIndex);
            HSSFCell numberCell = row.createCell(0);
            evi.setId(eviId);
            numberCell.setCellValue(eviId);
            eviId++;
            HSSFCell nameCell = row.createCell(1);
            nameCell.setCellValue(evi.getContent());
            ++rowIndex;
        }

        //���Excel�ļ�
        FileOutputStream output;
        try {
            output = new FileOutputStream("e:\\"+fileName+".xls");
            wb.write(output);
            output.flush();

            wb.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    private void writeEvi(HSSFWorkbook wb, ArrayList<FactModel> fList){
        //����HSSFSheet����
        HSSFSheet sheet = wb.createSheet("֤���嵥");

        //��д��ͷ
        writeEviSheetHead(sheet);
        //��д����
        writeEviSheetContent(sheet, fList);
    }

    private void writeFact(HSSFWorkbook wb, ArrayList<FactModel> fList){
        //����HSSFSheet����
        HSSFSheet sheet = wb.createSheet("��ʵ�嵥");

        //��д��ͷ
        writeFactSheetHead(sheet);
        //��д����
        writeFactSheetContent(sheet, fList);
    }

    private void writeEviSheetHead(HSSFSheet sheet){
        CellRangeAddress cra = new CellRangeAddress(0, 0, 0, 8);
        sheet.addMergedRegion(cra);
        HSSFRow titleRow = sheet.createRow(0);
        HSSFCell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("֤���嵥");

        HSSFRow headRow = sheet.createRow(1);
        HSSFCell titleCell1 = headRow.createCell(0);
        titleCell1.setCellValue("���");
        HSSFCell titleCell2 = headRow.createCell(1);
        titleCell2.setCellValue("֤������");
        HSSFCell titleCell3 = headRow.createCell(2);
        titleCell3.setCellValue("֤����ϸ");
        HSSFCell titleCell4 = headRow.createCell(3);
        titleCell4.setCellValue("֤������");
        HSSFCell titleCell5 = headRow.createCell(4);
        titleCell5.setCellValue("�ύ��");
        HSSFCell titleCell6 = headRow.createCell(5);
        titleCell6.setCellValue("��֤����");
        HSSFCell titleCell7 = headRow.createCell(6);
        titleCell7.setCellValue("��֤����");
        HSSFCell titleCell8 = headRow.createCell(7);
        titleCell8.setCellValue("��ͷ��Ϣ");
        HSSFCell titleCell9 = headRow.createCell(8);
        titleCell9.setCellValue("�ؼ��ı�");
    }

    private void writeEviSheetContent(HSSFSheet sheet, ArrayList<FactModel> fList){
        int rowIndex = 2;
        int eviId = 1;

        for(int i = 0;i<fList.size();i++){
            FactModel fact = fList.get(i);

            ArrayList<EvidenceModel> ceList = fact.getEvidenceList();
            for(EvidenceModel evi : ceList){
                ArrayList<String> headList = evi.getHeadList();

                int beginRowIndex = rowIndex;
                HSSFRow row = sheet.createRow(rowIndex);

                if(headList.size()>0){
                    for(String head : headList){
                        HSSFCell headCell = row.createCell(7);
                        headCell.setCellValue(head);
                        row = sheet.createRow(++rowIndex);
                    }
                    --rowIndex;
                }

                if(rowIndex > beginRowIndex){
                    CellRangeAddress idCra = new CellRangeAddress(beginRowIndex, rowIndex, 0, 0);
                    CellRangeAddress nameCra = new CellRangeAddress(beginRowIndex, rowIndex, 1, 1);
                    CellRangeAddress eviCra = new CellRangeAddress(beginRowIndex, rowIndex, 2, 2);
                    CellRangeAddress typeCra = new CellRangeAddress(beginRowIndex, rowIndex, 3, 3);
                    CellRangeAddress submitterCra = new CellRangeAddress(beginRowIndex, rowIndex, 4, 4);
                    CellRangeAddress reasonCra = new CellRangeAddress(beginRowIndex, rowIndex, 5, 5);
                    CellRangeAddress resultCra = new CellRangeAddress(beginRowIndex, rowIndex, 6, 6);
                    sheet.addMergedRegion(idCra);
                    sheet.addMergedRegion(nameCra);
                    sheet.addMergedRegion(eviCra);
                    sheet.addMergedRegion(typeCra);
                    sheet.addMergedRegion(submitterCra);
                    sheet.addMergedRegion(reasonCra);
                    sheet.addMergedRegion(resultCra);
                }
                row = sheet.getRow(beginRowIndex);
                HSSFCell numberCell = row.createCell(0);
                evi.setId(eviId);
                numberCell.setCellValue(eviId);
                eviId++;
                HSSFCell nameCell = row.createCell(1);
                nameCell.setCellValue(evi.getName());
                HSSFCell eviCell = row.createCell(2);
                eviCell.setCellValue(evi.getContent());
                HSSFCell typeCell = row.createCell(3);
                typeCell.setCellValue(evi.getType());
                HSSFCell submitterCell = row.createCell(4);
                submitterCell.setCellValue(evi.getSubmitter());
                ++rowIndex;
            }
        }
    }

    private void writeFactSheetHead(HSSFSheet sheet){
        CellRangeAddress cra = new CellRangeAddress(0, 0, 0, 5);
        sheet.addMergedRegion(cra);
        HSSFRow titleRow = sheet.createRow(0);
        HSSFCell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("��ʵ�嵥");

        HSSFRow headRow = sheet.createRow(1);
        HSSFCell titleCell1 = headRow.createCell(0);
        titleCell1.setCellValue("���");
        HSSFCell titleCell2 = headRow.createCell(1);
        titleCell2.setCellValue("��ʵ����");
        HSSFCell titleCell3 = headRow.createCell(2);
        titleCell3.setCellValue("��ʵ��ϸ");
        HSSFCell titleCell4 = headRow.createCell(3);
        titleCell4.setCellValue("��ͷ��Ϣ");
        HSSFCell titleCell5 = headRow.createCell(4);
        titleCell5.setCellValue("֤�����");
        HSSFCell titleCell6 = headRow.createCell(5);
        titleCell6.setCellValue("֤���ı�");
    }

    private void writeFactSheetContent(HSSFSheet sheet, ArrayList<FactModel> fList){
        int rowIndex = 2;

        for(int i = 0;i<fList.size();i++){
            FactModel fact = fList.get(i);

            int beginRowIndex = rowIndex;
            HSSFRow row = sheet.createRow(rowIndex);

            ArrayList<EvidenceModel> ceList = fact.getEvidenceList();

            if(ceList.size()>0){
                for(EvidenceModel evi : ceList){
                    ArrayList<String> headList = evi.getHeadList();
                    for(String head : headList){
                        HSSFCell headCell = row.createCell(3);
                        headCell.setCellValue(head);
                        HSSFCell eviIdCell = row.createCell(4);
                        eviIdCell.setCellValue(evi.getId());
                        HSSFCell eviCell = row.createCell(5);
                        eviCell.setCellValue(evi.getContent());
                        row = sheet.createRow(++rowIndex);
                    }
                }
                --rowIndex;
            }

            if(rowIndex > beginRowIndex){
                CellRangeAddress idCra = new CellRangeAddress(beginRowIndex, rowIndex, 0, 0);
                CellRangeAddress nameCra = new CellRangeAddress(beginRowIndex, rowIndex, 1, 1);
                CellRangeAddress factCra = new CellRangeAddress(beginRowIndex, rowIndex, 2, 2);
                sheet.addMergedRegion(idCra);
                sheet.addMergedRegion(nameCra);
                sheet.addMergedRegion(factCra);
            }
            row = sheet.getRow(beginRowIndex);
            HSSFCell idCell = row.createCell(0);
            idCell.setCellValue(i+1);
            HSSFCell factCell = row.createCell(2);
            factCell.setCellValue(fact.getContent());
            ++rowIndex;
        }
    }
}