package com.buysell.demo.payload;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class ItemRequest {
    @NotBlank
    @Size(max = 40)
    private String itemName;

    @NotBlank
    @Size(max = 100)
    private String description;

    @NotNull
    @Valid
    private ItemLength itemLength;

    private Long userId;

    /*
    @NotNull
    private MultipartFile[] files;

    public MultipartFile[] getFiles() {
        return files;
    }

    public void setFiles(MultipartFile[] files) {
        this.files = files;
    }
    */

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ItemLength getItemLength() {
        return itemLength;
    }

    public void setItemLength(ItemLength itemLength) {
        this.itemLength = itemLength;
    }
}
