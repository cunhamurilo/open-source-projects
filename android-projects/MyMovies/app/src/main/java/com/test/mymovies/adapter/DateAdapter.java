package com.test.mymovies.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.test.mymovies.R;

import java.util.ArrayList;

public class DateAdapter extends RecyclerView.Adapter<DateAdapter.MyViewHolder> {

    // Variables
    private ArrayList<String> mDataset;
    private String choice;
    private Context context;

    // Constructor
    public DateAdapter(Context context,ArrayList<String>  myDataset, String choice) {
        this.context = context;
        this.mDataset = myDataset;
        this.choice = choice;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent,
                                                     int viewType) {
        // create a new view
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_movie_date, parent, false);

        MyViewHolder vh = new MyViewHolder(v);
        return vh;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        // Adds the values for the fields

        if(choice.contains("date") || !mDataset.get(position).toLowerCase().contains("https")) {
            holder.textView.setText(mDataset.get(position));
            holder.textView.setVisibility(View.VISIBLE);
            holder.imageView.setVisibility(View.GONE);
        }else{
            Glide.with(context).load(mDataset.get(position)).into(holder.imageView);
            holder.textView.setVisibility(View.GONE);
            holder.imageView.setVisibility(View.VISIBLE);

        }

    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }

    public class MyViewHolder extends RecyclerView.ViewHolder {

        public TextView textView;
        public ImageView imageView;

        public MyViewHolder(View v) {
            super(v);
            textView = v.findViewById(R.id.tv_item_movie);
            imageView = v.findViewById(R.id.imageView3);

        }
    }

}