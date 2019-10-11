package com.buysell.demo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue
    private Long id;

    private String itemName;

    @OneToMany(
            mappedBy = "items",
            orphanRemoval = true
    )
    private List<Bid> bids = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private Seller seller;

    private Item() {}

    public Item(Long id, String itemName, List<Bid> bids, Seller seller) {
        this.id = id;
        this.itemName = itemName;
        this.bids = bids;
        this.seller = seller;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Item)) return false;
        Item item = (Item) o;
        return Objects.equals(id, item.id) &&
                Objects.equals(itemName, item.itemName) &&
                Objects.equals(bids, item.bids) &&
                Objects.equals(seller, item.seller);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, itemName, bids, seller);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public List<Bid> getBids() {
        return bids;
    }

    public void setBids(List<Bid> bids) {
        this.bids = bids;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", itemName='" + itemName + '\'' +
                ", bids=" + bids +
                ", seller=" + seller +
                '}';
    }
}