package com.assettrack.mapper;

import com.assettrack.domain.AllocationRecord;
import com.assettrack.domain.Asset;
import com.assettrack.domain.ConditionReport;
import com.assettrack.dto.response.AllocationRecordResponse;
import com.assettrack.dto.response.AssetDetailResponse;
import com.assettrack.dto.response.AssetResponse;
import com.assettrack.dto.response.ConditionReportResponse;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-04T01:09:51+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.10 (Oracle Corporation)"
)
@Component
public class AssetMapperImpl implements AssetMapper {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private AllocationRecordMapper allocationRecordMapper;
    @Autowired
    private ConditionReportMapper conditionReportMapper;

    @Override
    public AssetResponse toResponse(Asset asset) {
        if ( asset == null ) {
            return null;
        }

        AssetResponse assetResponse = new AssetResponse();

        assetResponse.setId( asset.getId() );
        assetResponse.setType( asset.getType() );
        assetResponse.setBrand( asset.getBrand() );
        assetResponse.setModel( asset.getModel() );
        assetResponse.setSerialNumber( asset.getSerialNumber() );
        assetResponse.setPurchaseDate( asset.getPurchaseDate() );
        assetResponse.setWarrantyExpirationDate( asset.getWarrantyExpirationDate() );
        assetResponse.setStatus( asset.getStatus() );
        assetResponse.setCondition( asset.getCondition() );
        assetResponse.setCurrentOwner( userMapper.toResponse( asset.getCurrentOwner() ) );
        assetResponse.setCreatedAt( asset.getCreatedAt() );
        assetResponse.setUpdatedAt( asset.getUpdatedAt() );

        assetResponse.setWarrantyStatus( computeWarrantyStatus(asset) );

        return assetResponse;
    }

    @Override
    public AssetDetailResponse toDetailResponse(Asset asset) {
        if ( asset == null ) {
            return null;
        }

        AssetDetailResponse assetDetailResponse = new AssetDetailResponse();

        assetDetailResponse.setId( asset.getId() );
        assetDetailResponse.setType( asset.getType() );
        assetDetailResponse.setBrand( asset.getBrand() );
        assetDetailResponse.setModel( asset.getModel() );
        assetDetailResponse.setSerialNumber( asset.getSerialNumber() );
        assetDetailResponse.setPurchaseDate( asset.getPurchaseDate() );
        assetDetailResponse.setWarrantyExpirationDate( asset.getWarrantyExpirationDate() );
        assetDetailResponse.setStatus( asset.getStatus() );
        assetDetailResponse.setCondition( asset.getCondition() );
        assetDetailResponse.setCurrentOwner( userMapper.toResponse( asset.getCurrentOwner() ) );
        assetDetailResponse.setCreatedAt( asset.getCreatedAt() );
        assetDetailResponse.setUpdatedAt( asset.getUpdatedAt() );
        assetDetailResponse.setAllocationHistory( allocationRecordListToAllocationRecordResponseList( asset.getAllocationHistory() ) );
        assetDetailResponse.setConditionReports( conditionReportListToConditionReportResponseList( asset.getConditionReports() ) );

        assetDetailResponse.setWarrantyStatus( computeWarrantyStatus(asset) );

        return assetDetailResponse;
    }

    protected List<AllocationRecordResponse> allocationRecordListToAllocationRecordResponseList(List<AllocationRecord> list) {
        if ( list == null ) {
            return null;
        }

        List<AllocationRecordResponse> list1 = new ArrayList<AllocationRecordResponse>( list.size() );
        for ( AllocationRecord allocationRecord : list ) {
            list1.add( allocationRecordMapper.toResponse( allocationRecord ) );
        }

        return list1;
    }

    protected List<ConditionReportResponse> conditionReportListToConditionReportResponseList(List<ConditionReport> list) {
        if ( list == null ) {
            return null;
        }

        List<ConditionReportResponse> list1 = new ArrayList<ConditionReportResponse>( list.size() );
        for ( ConditionReport conditionReport : list ) {
            list1.add( conditionReportMapper.toResponse( conditionReport ) );
        }

        return list1;
    }
}
